defmodule Presto do
  @moduledoc """
  Presto pages!
  """

  @type component_id() :: Registry.key()
  @type component_module() :: atom()
  @type component_create() :: {:ok, Presto.component_id()} | {:error, term()}
  @type component_event() :: term()
  @type component_ref() :: {:presto_component, pid()}
  @type component_instance :: {:safe, term()}

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
  # @spec component(component_module) :: any
  # def component(component_module) do
  #   component_id =
  #   component(component_module, component_id)
  # end

  @spec component(component_module, component_id) :: any
  def component(component_module, component_id \\ nil) do
    component_id = component_id || :crypto.strong_rand_bytes(16)
    encoded_id = encode_id(component_id)
    {:ok, pid} = find_or_create_component(component_module, encoded_id)
    {:presto_component, pid}
  end

  @spec render(component_ref) :: component_instance()
  def render({:presto_component, pid}) do
    {:ok, component} = Presto.Component.render(pid)
    instance = Phoenix.HTML.Tag.content_tag(:div, component, class: "presto-component-instance", id: make_instance_id())
    instance
  end

  def render_component(component, component_id \\ nil) do
    cb = Application.get_env(:presto, :component_base)
    Module.concat(cb, component)
    |> Presto.component(component_id)
    |> Presto.render()
  end

  # component_ids need to be stable
  def encode_id(id) do
    key = Application.get_env(:presto, :secret_key_base)
    data = :erlang.term_to_binary(id)
    :crypto.hmac(:sha256, key, data) |> Base.encode16()
  end

  # instance_ids should be unique and unguessable
  defp make_instance_id() do
    :crypto.strong_rand_bytes(32) |> Base.encode16()
  end
end
