defmodule PrestoTest do
  use ExUnit.Case, async: false
  # doctest Presto

  setup do
    start_supervised({Registry, keys: :unique, name: Presto.ComponentRegistry})
    start_supervised(Presto.ComponentSupervisor)
    :ok
  end

  defmodule CounterComponent do
    use Presto.Component

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

  defmodule CounterComponent2 do
    use Presto.Component
  end

  describe "create_component/2" do
    test "creates a component" do
      {:ok, pid} = Presto.create_component(CounterComponent, 1)
      assert is_pid(pid)
    end

    test "creates several components" do
      {:ok, _pid} = Presto.create_component(CounterComponent, 1)
      {:ok, _pid} = Presto.create_component(CounterComponent, 2)
      {:ok, _pid} = Presto.create_component(CounterComponent, 3)
    end

    test "fails to create duplicate component" do
      {:ok, _pid} = Presto.create_component(CounterComponent, 1)
      {:error, :process_already_exists} = Presto.create_component(CounterComponent, 1)
    end

    test "component_ids are scoped by module" do
      {:ok, _pid} = Presto.create_component(CounterComponent, 1)
      {:ok, _pid} = Presto.create_component(CounterComponent2, 1)
    end
  end

  describe "find_component/2" do
    test "finds a component" do
      {:ok, _pid} = Presto.create_component(CounterComponent, 1)
      {:ok, pid} = Presto.find_component(CounterComponent, 1)
      assert is_pid(pid)
    end

    test "fails to find a component" do
      {:error, :no_such_component} = Presto.find_component(CounterComponent, 1)
    end
  end

  describe "find_or_create_component/2" do
    test "creates a component if non-existent" do
      {:ok, pid} = Presto.find_or_create_component(CounterComponent, 1)
      assert is_pid(pid)
    end

    test "returns existing component" do
      {:ok, pid} = Presto.create_component(CounterComponent, 1)
      {:ok, ^pid} = Presto.find_or_create_component(CounterComponent, 1)
    end
  end

  describe "component_exists?/2" do
    test "false if component does not exist" do
      refute Presto.component_exists?(CounterComponent, 1)
    end

    test "returns existing component" do
      {:ok, _pid} = Presto.create_component(CounterComponent, 1)
      assert Presto.component_exists?(CounterComponent, 1)
    end
  end
end
