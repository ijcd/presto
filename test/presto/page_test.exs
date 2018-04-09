defmodule Presto.PageTest do
  use ExUnit.Case, async: false
  alias Presto.Page

  setup do
    start_supervised({Registry, keys: :unique, name: Presto.PageRegistry})
    :ok
  end

  defmodule PageIdFixture do
    use Presto.Page
  end

  defmodule PageIdTooFixture do
    use Presto.Page
  end

  defmodule PageIdOverriddenFixture do
    use Presto.Page
    def page_id(_conn), do: 7
  end

  describe "page_id/1" do
    test "starts with a page_id" do
      {:ok, _pid} = Page.start_link(PageIdFixture, "visitor1")
    end

    test "starts with a similar page_ids" do
      {:ok, _pid} = Page.start_link(PageIdFixture, "visitor1")
      {:ok, _pid} = Page.start_link(PageIdTooFixture, "visitor1")
    end

    test "errors on duplicate page_id" do
      {:ok, _pid} = Page.start_link(PageIdFixture, "visitor1")
      {:error, {:already_started, _pid}} = Page.start_link(PageIdFixture, "visitor1")
    end

    test "returns page_id from conn.assigns.visitor_id" do
      assert 5 == PageIdFixture.page_id(%{assigns: %{visitor_id: 5}})
    end

    test "is overridable" do
      assert 7 == PageIdOverriddenFixture.page_id(nil)
    end
  end

  defmodule StartLinkFixture do
    use Presto.Page
  end

  describe "start_link/3" do
    test "can give a different initial model" do
      {:ok, pid1} = Page.start_link(StartLinkFixture, "visitor1", 1)
      {:ok, pid2} = Page.start_link(StartLinkFixture, "visitor2", 2)

      {:ok, res1} = Presto.Page.update(pid1, :current)
      {:ok, res2} = Presto.Page.update(pid2, :current)

      assert res1 == {:safe, "1"}
      assert res2 == {:safe, "2"}
    end
  end

  defmodule InitialModelFixture do
    use Presto.Page
    def initial_model(model), do: model + 3
  end

  describe "initial_model/1" do
    test "can override the initial model" do
      {:ok, pid} = Page.start_link(InitialModelFixture, "visitor1", 1)

      {:ok, res} = Presto.Page.update(pid, :current)

      assert res == {:safe, "4"}
    end
  end

  defmodule UpdateFixture do
    use Presto.Page

    def update(message, model) do
      case message do
        :current -> model
        :inc -> model + 1
      end
    end
  end

  describe "update/2" do
    test "performs an update" do
      {:ok, pid} = Page.start_link(UpdateFixture, "visitor1", 1)

      {:ok, result1} = Presto.Page.update(pid, :current)
      {:ok, result2} = Presto.Page.update(pid, :inc)

      assert result1 == {:safe, "1"}
      assert result2 == {:safe, "2"}
    end
  end
end
