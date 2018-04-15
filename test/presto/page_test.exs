defmodule Presto.PageTestMacros do
end

defmodule Presto.PageTest do
  use ExUnit.Case, async: false
  require Presto.PageTestMacros
  alias Presto.Page

  setup do
    start_supervised({Registry, keys: :unique, name: Presto.PageRegistry})
    :ok
  end

  def make_response(content, page_key \\ "visitor1") do
    component_id = Base.encode16(page_key)

    %Presto.Action.UpdateComponent{
      component_selector: ".presto-component##{component_id}",
      content: "<div class=\"presto-component\" id=\"#{component_id}\">#{content}</div>",
      name: "update_component"
    }
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
      assert 5 == PageIdFixture.page_id(%{visitor_id: 5})
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

      assert res1 == make_response("1")
      assert res2 == make_response("2", "visitor2")
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

      assert res == make_response("4")
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

      assert result1 == make_response("1")
      assert result2 == make_response("2")
    end
  end

  describe "render/1" do
    test "renders the current state" do
      {:ok, pid} = Page.start_link(UpdateFixture, "visitor1", 1)

      {:ok, result1} = Presto.Page.render(pid)

      assert result1 ==
               {:safe,
                [
                  60,
                  "div",
                  [
                    [32, "class", 61, 34, "presto-component", 34],
                    [32, "id", 61, 34, "76697369746F7231", 34]
                  ],
                  62,
                  "1",
                  60,
                  47,
                  "div",
                  62
                ]}
    end
  end
end
