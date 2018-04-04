defmodule Presto.PageTest do
  use ExUnit.Case, async: false
  alias Presto.Page

  setup do
    start_supervised({Registry, keys: :unique, name: Presto.PageRegistry})
    :ok
  end

  defmodule CounterPage do
    use Presto.Page

    def update(message, model) do
      case message do
        :initial -> model
        :inc -> model + 1
      end
    end

    def render(model) do
      {:safe, "Counter is: #{model}"}
    end
  end

  defmodule CounterPage2 do
    use Presto.Page
  end

  test "starts with a page_id" do
    {:ok, _pid} = Page.start_link(CounterPage, "foobar")
  end

  test "starts with a similar page_ids" do
    {:ok, _pid} = Page.start_link(CounterPage, "foobar")
    {:ok, _pid} = Page.start_link(CounterPage2, "foobar")
  end

  test "errors on duplicate page_id" do
    {:ok, _pid} = Page.start_link(CounterPage, "foobar")
    {:error, {:already_started, _pid}} = Page.start_link(CounterPage, "foobar")
  end

  test "returns an initial page using state" do
    {:ok, pid1} = Page.start_link(CounterPage, "page1", 1)
    {:ok, pid2} = Page.start_link(CounterPage, "page2", 2)

    {:ok, res1} = Presto.Page.update(pid1, :initial)
    {:ok, res2} = Presto.Page.update(pid2, :initial)

    assert res1 == {:safe, "Counter is: 1"}
    assert res2 == {:safe, "Counter is: 2"}
  end

  test "performs an update" do
    {:ok, pid} = Page.start_link(CounterPage, "foobar", 1)

    {:ok, result} = Presto.Page.update(pid, :inc)

    assert result == {:safe, "Counter is: 2"}
  end
end
