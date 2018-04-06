defmodule Presto do
  @moduledoc """
  Presto pages!
  """

  @type page_key() :: Registry.key()
  @type page_module() :: atom()
  @type page_create() :: {:ok, Presto.page_key()} | {:error, term()}
  @type page_event() :: term()

  @doc """
  Creates a new page process based on the `page_module`, and `page_key`.
  Returns a tuple such as `{:ok, page_key}` if successful. If there is an
  issue, an `{:error, reason}` tuple is returned.
  """
  @spec create_page(page_module(), page_key()) :: page_create()
  def create_page(page_module, page_key) do
    case Presto.PageSupervisor.start_page(page_module, page_key) do
      {:ok, pid} -> {:ok, pid}
      {:error, {:already_started, _pid}} -> {:error, :process_already_exists}
      other -> {:error, other}
    end
  end

  @doc """
  Finds an existing page process based on the `page_module`, and `page_key`.
  Returns a tuple such as `{:ok, page_key}` if successful. If there is an
  issue, an `{:error, reason}` tuple is returned.
  """
  @spec find_page(page_module(), page_key()) :: page_create()
  def find_page(page_module, page_key) do
    key_spec = page_module.key_spec(page_key)

    case Registry.lookup(Presto.PageRegistry, key_spec) do
      [] -> {:error, :no_such_page}
      [{pid, _meta}] -> {:ok, pid}
    end
  end

  @doc """
  Finds an existing page process based on the `page_module`, and `page_key`.
  If the page is not found, it is created and returned instead.
  Returns a tuple such as `{:ok, page_key}` if successful. If there is an
  issue, an `{:error, reason}` tuple is returned.
  """
  @spec find_or_create_page(page_module(), page_key()) :: page_create()
  def find_or_create_page(page_module, page_key) do
    key_spec = page_module.key_spec(page_key)

    case Registry.lookup(Presto.PageRegistry, key_spec) do
      [] ->
        create_page(page_module, page_key)

      [{pid, _meta}] ->
        {:ok, pid}
    end
  end

  @doc """
  Determines if a `Presto.Page` process exists, based on the `page_key`
  provided.  Returns a boolean.

  ## Example

      iex> Presto.page_exists?(DemoPage, 6)
      false

  """
  @spec page_exists?(page_module, page_key) :: boolean
  def page_exists?(page_module, page_key) do
    case find_page(page_module, page_key) do
      {:error, :no_such_page} -> false
      {:ok, pid} when is_pid(pid) -> true
    end
  end

  @doc """
  Send an event to a page.
  """
  @spec dispatch(page_module, page_key, page_event) :: any
  def dispatch(page_module, page_key, message) do
    {:ok, pid} = Presto.find_or_create_page(page_module, page_key)
    Presto.Page.update(pid, message)
  end
end
