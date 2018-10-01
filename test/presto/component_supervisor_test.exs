defmodule Presto.ComponentSupervisorTest do
  use ExUnit.Case, async: false
  alias Presto.ComponentSupervisor

  setup do
    start_supervised({Registry, keys: :unique, name: Presto.ComponentRegistry})
    :ok
  end

  defmodule CounterComponent do
    use Presto.Component
  end

  test "fails to start two supervisors" do
    {:ok, _} = start_supervised(ComponentSupervisor)
    {:error, _} = start_supervised(ComponentSupervisor)
  end

  test "starts a component" do
    {:ok, _} = start_supervised(ComponentSupervisor)
    {:ok, _component} = ComponentSupervisor.start_component(CounterComponent, 1)
  end
end
