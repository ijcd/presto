defmodule Presto.ComponentSupervisor do
  @moduledoc """
  DynamicSupervisor to handle the creation of dynamic
  `Presto.Component` processes.

  These processes will spawn for each `component_id` provided to the
  `Presto.Component.start_link` function.

  Functions contained in this supervisor module will assist in the
  creation and retrieval of new page processes.
  """

  use DynamicSupervisor
  require Logger

  ######################
  ### Client Methods ###
  ######################

  @doc """
  Starts the supervisor.
  """
  def start_link(_args \\ []) do
    DynamicSupervisor.start_link(__MODULE__, [], name: __MODULE__)
  end

  @doc """
  Starts a supervised Presto.Component process.
  """
  @spec start_component(Presto.component_module(), Presto.component_key(), Presto.Component.model()) :: term()
  def start_component(component_module, component_key, initial_model \\ %{}) do
    # @spec start_component(Presto.component_module(), Presto.component_key()) :: term()
    # def start_component(component_module, component_key) do
    spec = %{
      id: Presto.Component,
      # start: {Presto.Component, :start_link, [component_module, component_key, initial_model]},
      start: {Presto.Component, :start_link, [component_module, component_key, initial_model]},
      restart: :transient
    }

    DynamicSupervisor.start_child(__MODULE__, spec)
  end

  ######################
  ### Server Methods ###
  ######################

  def init(initial_args) do
    DynamicSupervisor.init(
      strategy: :one_for_one,
      extra_arguments: initial_args
    )
  end
end
