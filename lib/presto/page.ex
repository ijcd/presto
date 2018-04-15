defmodule Presto.Page do
  use GenServer, restart: :transient
  import Kernel, except: [div: 2]
  import Taggart.HTML, only: [div: 2]
  alias Presto.Util

  @type message :: term()
  @type model :: term()
  @type assigns :: Keyword.t() | map

  # Plug.Conn callbacks
  @callback init(Plug.opts()) :: Plug.opts()
  @callback call(Plug.Conn.t(), Plug.opts()) :: Plug.Conn.t()

  # Page addressing
  @callback page_id(assigns) :: term()
  @callback key_spec(Presto.page_key()) :: term()

  # State, update, and render
  @callback initial_model(model()) :: term()
  @callback update(message(), model()) :: model()
  @callback render(model()) :: Util.safe()

  defmacro __using__(_opts) do
    quote location: :keep do
      @behaviour Presto.Page

      def key_spec(page_key) do
        {__MODULE__, page_key}
      end

      def init([]), do: :index

      def call(conn, :index) do
        assigns = Map.put(conn.assigns, :conn, conn)

        {:safe, body} = Presto.component(__MODULE__, page_id(assigns))

        conn
        |> Plug.Conn.put_resp_header("content-type", "text/html; charset=utf-8")
        |> Plug.Conn.send_resp(200, body)
      end

      def page_id(assigns) do
        assigns.visitor_id
      end

      def update(_message, model), do: model

      def render(model), do: {:safe, inspect(model)}

      def initial_model(model), do: model

      defoverridable Presto.Page
    end
  end

  ######################
  ### Client Methods ###
  ######################

  defmodule State do
    defstruct page_module: nil,
              page_key: nil,
              model: %{}
  end

  @doc """
  Starts a `Presto.Page` GenServer
  """
  def start_link(page_module, page_key, initial_model \\ %{}) do
    key_spec = page_module.key_spec(page_key)
    name = via_tuple(key_spec)
    model = page_module.initial_model(initial_model)

    initial_state = %State{page_key: page_key, page_module: page_module, model: model}

    GenServer.start_link(__MODULE__, initial_state, name: name)
  end

  @doc """
  Sends an update message to the page, returning the newly
  rendered content.
  """
  def update(page, message) do
    GenServer.call(page, {:update, message})
  end

  @doc """
  Sends an update message to the page, returning the newly
  rendered content.
  """
  def render(page) do
    GenServer.call(page, :render)
  end

  ######################
  ### Server Methods ###
  ######################

  @doc """
  Initializes state with the page_module and initial model from
  `start_link`
  """
  def init(initial_state) do
    {:ok, initial_state}
  end

  @doc """
  Renders the current state by calling `render(model)` with the
  current model state.
  """
  def handle_call(:render, _from, state) do
    reply = {:ok, do_render(state)}
    {:reply, reply, state}
  end

  @doc """
  Performs an update operation by calling `update(message, model)`
  on the page_module module from `init`
  """
  def handle_call({:update, message}, _from, state) do
    new_state = do_update(message, state)

    content =
      new_state
      |> do_render()
      |> Util.safe_to_string()

    component_selector = ".presto-component##{component_id(state.page_key)}"

    reply =
      {:ok,
       %Presto.Action.UpdateComponent{
         component_selector: component_selector,
         content: content
       }}

    {:reply, reply, new_state}
  end

  ######################
  ### Helper Methods ###
  ######################

  defp do_update(message, state = %{model: model, page_module: page_module}) do
    new_model = page_module.update(message, model)
    %{state | model: new_model}
  end

  defp do_render(%{model: model, page_module: page_module, page_key: page_key}) do
    div(class: "presto-component", id: component_id(page_key)) do
      page_module.render(model)
    end
  end

  defp component_id(page_key) do
    Base.encode16(page_key)
  end

  defp via_tuple(page_key) do
    {:via, Registry, {Presto.PageRegistry, page_key}}
  end
end
