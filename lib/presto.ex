defmodule Presto do
  @moduledoc """
  Presto pages!
  """

  @type component_id() :: Registry.key()
  @type component_module() :: atom()
  @type component_create() :: {:ok, Presto.component_id()} | {:error, term()}
  @type component_event() :: term()

  @doc """
  Creates a new component process based on the `component_module`, and `component_key`.
  Returns a tuple such as `{:ok, component_key}` if successful. If there is an
  issue, an `{:error, reason}` tuple is returned.
  """
  @spec create_component(component_module(), component_id()) :: component_create()
  def create_component(component_module, component_id) do
    case Presto.ComponentSupervisor.start_component(component_module, component_id) do
      {:ok, pid} -> {:ok, pid}
      {:error, {:already_started, _pid}} -> {:error, :process_already_exists}
      other -> {:error, other}
    end
  end

  @doc """
  Finds an existing component process..
  Returns a tuple such as `{:ok, component_id}` if successful. If there is an
  issue, an `{:error, reason}` tuple is returned.
  """
  @spec find_component(component_id()) :: component_create()
  def find_component(component_id) do
    case Registry.lookup(Presto.ComponentRegistry, component_id) do
      [] -> {:error, :no_such_component}
      [{pid, _meta}] -> {:ok, pid}
    end
  end

  @doc """
  Finds an existing component process based on the `component_module`, and `component_key`.
  If the component is not found, it is created and returned instead.
  Returns a tuple such as `{:ok, component_key}` if successful. If there is an
  issue, an `{:error, reason}` tuple is returned.
  """
  @spec find_or_create_component(component_module(), component_id()) :: component_create()
  def find_or_create_component(component_module, component_id) do
    case Registry.lookup(Presto.ComponentRegistry, component_id) do
      [] ->
        create_component(component_module, component_id)

      [{pid, _meta}] ->
        {:ok, pid}
    end
  end

  @doc """
  Determines if a `Presto.Component` process exists, based on the `component_key`
  provided.  Returns a boolean.

  ## Example

      iex> Presto.component_exists?(DemoComponent, 6)
      false

  """
  @spec component_exists?(component_id) :: boolean
  def component_exists?(component_id) do
    case find_component(component_id) do
      {:error, :no_such_component} -> false
      {:ok, pid} when is_pid(pid) -> true
    end
  end

  @doc """
  Send an event to a component.
  """
  @spec dispatch(component_event) :: any
  def dispatch(%{"component_id" => component_id} = message) do
    {:ok, pid} = Presto.find_component(component_id)
    Presto.Component.update(pid, message)
  end

  @doc """
  Embed a component.
  """
  @spec component(component_module) :: any
  def component(component_module) do
    component_id = :crypto.strong_rand_bytes(16)
    component(component_module, component_id)
  end

  @spec component(component_module, component_id) :: any
  def component(component_module, component_id) do
    {:ok, pid} = find_or_create_component(component_module, encode_id(component_id))
    {:presto_component, pid}
  end

  def render({:presto_component, pid}) do
    {:ok, component} = Presto.Component.render(pid)
    instance = Phoenix.HTML.Tag.content_tag(:div, component, class: "presto-component-instance", id: make_instance_id())
    instance
  end

  # component_ids need to be stable
  def encode_id(id) do
    Phoenix.Token.sign(PrestoDemoWeb.Endpoint, "component salt", id, signed_at: 0)
    |> Base.url_encode64(padding: false)
  end

  # defp decode_id(text) do
  #   text
  #   |> Base.url_decode64(padding: false)
  #   |> (&(Phoenix.Token.verify(MyApp.Endpoint, "component salt", &1, max_age: 86400*30))).()
  # end

  # instance_ids need to be secure
  defp make_instance_id() do
    :crypto.strong_rand_bytes(32) |> Base.url_encode64(padding: false)
  end
end
