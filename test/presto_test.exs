defmodule PrestoTest do
  use ExUnit.Case, async: false
  # doctest Presto

  setup do
    start_supervised({Registry, keys: :unique, name: Presto.PageRegistry})
    start_supervised(Presto.PageSupervisor)
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

  describe "create_page/2" do
    test "creates a page" do
      {:ok, pid} = Presto.create_page(CounterPage, 1)
      assert is_pid(pid)
    end

    test "creates several pages" do
      {:ok, _pid} = Presto.create_page(CounterPage, 1)
      {:ok, _pid} = Presto.create_page(CounterPage, 2)
      {:ok, _pid} = Presto.create_page(CounterPage, 3)
    end

    test "fails to create duplicate page" do
      {:ok, _pid} = Presto.create_page(CounterPage, 1)
      {:error, :process_already_exists} = Presto.create_page(CounterPage, 1)
    end

    test "page_ids are scoped by module" do
      {:ok, _pid} = Presto.create_page(CounterPage, 1)
      {:ok, _pid} = Presto.create_page(CounterPage2, 1)
    end
  end

  describe "find_page/2" do
    test "finds a page" do
      {:ok, _pid} = Presto.create_page(CounterPage, 1)
      {:ok, pid} = Presto.find_page(CounterPage, 1)
      assert is_pid(pid)
    end

    test "fails to find a page" do
      {:error, :no_such_page} = Presto.find_page(CounterPage, 1)
    end
  end

  describe "find_or_create_page/2" do
    test "creates a page if non-existent" do
      {:ok, pid} = Presto.find_or_create_page(CounterPage, 1)
      assert is_pid(pid)
    end

    test "returns existing page" do
      {:ok, pid} = Presto.create_page(CounterPage, 1)
      {:ok, ^pid} = Presto.find_or_create_page(CounterPage, 1)
    end
  end

  describe "page_exists?/2" do
    test "false if page does not exist" do
      refute Presto.page_exists?(CounterPage, 1)
    end

    test "returns existing page" do
      {:ok, pid} = Presto.create_page(CounterPage, 1)
      assert Presto.page_exists?(CounterPage, 1)
    end
  end
end
