defmodule Presto.Component do
  use GenServer, restart: :transient
  import Kernel, except: [div: 2]
  alias Presto.Util

  @type message :: term()
  @type model :: term()
  @type assigns :: Keyword.t() | map

  # Plug.Conn callbacks
  @callback init(Plug.opts()) :: Plug.opts()
  @callback call(Plug.Conn.t(), Plug.opts()) :: Plug.Conn.t()

  # Component addressing
  @callback component_id(assigns) :: term()
  @callback key_spec(Presto.component_key()) :: term()

  # State, update, and render
  @callback initial_model(model()) :: term()
  @callback update(message(), model()) :: model()
  @callback render(model()) :: Util.safe()

  defmacro __using__(_opts) do
    quote location: :keep do
      @behaviour Presto.Component

      def key_spec(component_key) do
        {__MODULE__, component_key}
      end

      def init([]), do: :index

      def call(conn, :index) do
        assigns = Map.put(conn.assigns, :conn, conn)

        {:safe, body} = Presto.component(__MODULE__, component_id(assigns))

        conn
        |> Plug.Conn.put_resp_header("content-type", "text/html; charset=utf-8")
        |> Plug.Conn.send_resp(200, body)
      end

      def component_id(assigns) do
        assigns.visitor_id
      end

      def update(_message, model), do: model

      def render(model), do: {:safe, inspect(model)}

      def initial_model(model), do: model

      defoverridable Presto.Component
    end
  end

  ######################
  ### Client Methods ###
  ######################

  defmodule State do
    defstruct component_module: nil,
              component_key: nil,
              model: %{}
  end

  @doc """
  Starts a `Presto.Component` GenServer
  """
  def start_link(component_module, component_key, initial_model \\ %{}) do
    key_spec = component_module.key_spec(component_key)
    name = via_tuple(key_spec)
    model = component_module.initial_model(initial_model)

    initial_state = %State{component_key: component_key, component_module: component_module, model: model}

    GenServer.start_link(__MODULE__, initial_state, name: name)
  end

  @doc """
  Sends an update message to the Component, returning the newly
  rendered content.
  """
  def update(component, message) do
    GenServer.call(component, {:update, message})
  end

  @doc """
  Sends an update message to the Component, returning the newly
  rendered content.
  """
  def render(component) do
    GenServer.call(component, :render)
  end

  ######################
  ### Server Methods ###
  ######################

  @doc """
  Initializes state with the component_module and initial model from
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
  on the component_module module from `init`
  """
  def handle_call({:update, message}, _from, state) do
    new_state = do_update(message, state)

    content =
      new_state
      |> do_render()
      |> Util.safe_to_string()

    component_selector = ".presto-component##{component_id(state.component_key)}"

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

  defp do_update(message, state = %{model: model, component_module: component_module}) do
    new_model = component_module.update(message, model)
    %{state | model: new_model}
  end

  defp do_render(%{model: model, component_module: component_module, component_key: component_key}) do
    content = component_module.render(model)
    Phoenix.HTML.Tag.content_tag(:div, content, class: "presto-component", id: component_id(component_key))
  end

  defp component_id(component_key) do
    Base.encode16(component_key)
  end

  defp via_tuple(component_key) do
    {:via, Registry, {Presto.ComponentRegistry, component_key}}
  end
end
