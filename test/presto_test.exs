defmodule PrestoTest do
  use ExUnit.Case
  doctest Presto

  test "greets the world" do
    assert Presto.hello() == :world
  end
end
