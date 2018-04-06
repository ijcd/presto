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
        :current -> model
        :inc -> model + 1
      end
    end

    def render(model) do
      {:safe, "Counter is: #{model}"}
    end
  end

  defmodule CounterPage2 do
    use Presto.Page

    def page_id(_conn) do
      7
    end
  end

  defmodule CounterPage3 do
    use Presto.Page

    def initial_model(model) do
      model + 3
    end
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

  test "can give a different initial model" do
    {:ok, pid1} = Page.start_link(CounterPage, "page1", 1)
    {:ok, pid2} = Page.start_link(CounterPage, "page2", 2)

    {:ok, res1} = Presto.Page.update(pid1, :current)
    {:ok, res2} = Presto.Page.update(pid2, :current)

    assert res1 == {:safe, "Counter is: 1"}
    assert res2 == {:safe, "Counter is: 2"}
  end

  test "can override the initial model" do
    {:ok, pid} = Page.start_link(CounterPage3, "page1", 1)

    {:ok, res} = Presto.Page.update(pid, :current)

    assert res == {:safe, "4"}
  end

  test "performs an update" do
    {:ok, pid} = Page.start_link(CounterPage, "foobar", 1)

    {:ok, result} = Presto.Page.update(pid, :inc)

    assert result == {:safe, "Counter is: 2"}
  end

  describe "page_id/1" do
    test "returns page_id from conn.assigns.visitor_id" do
      assert 5 == CounterPage.page_id(%{assigns: %{visitor_id: 5}})
    end

    test "is overridable" do
      assert 7 == CounterPage2.page_id(nil)
    end
  end
end
