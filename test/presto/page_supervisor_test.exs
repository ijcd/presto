defmodule Presto.PageSupervisorTest do
  use ExUnit.Case, async: false
  alias Presto.PageSupervisor

  setup do
    start_supervised({Registry, keys: :unique, name: Presto.PageRegistry})
    :ok
  end

  defmodule CounterPage do
    use Presto.Page
  end

  test "fails to start two supervisors" do
    {:ok, _} = start_supervised(PageSupervisor)
    {:error, _} = start_supervised(PageSupervisor)
  end

  test "starts a page" do
    {:ok, _} = start_supervised(PageSupervisor)
    {:ok, _page} = PageSupervisor.start_page(CounterPage, 1)
  end
end
