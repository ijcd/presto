defmodule Presto.PageSupervisor do
  @moduledoc """
  DynamicSupervisor to handle the creation of dynamic
  `Presto.Page` processes.

  These processes will spawn for each `page_id` provided to the
  `Presto.Page.start_link` function.

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
  Starts a supervised Presto.Page process.
  """
  @spec start_page(Presto.page_module(), Presto.page_key(), Presto.Page.model()) :: term()
  def start_page(page_module, page_key, initial_model \\ %{}) do
    # @spec start_page(Presto.page_module(), Presto.page_key()) :: term()
    # def start_page(page_module, page_key) do
    spec = %{
      id: Presto.Page,
      # start: {Presto.Page, :start_link, [page_module, page_key, initial_model]},
      start: {Presto.Page, :start_link, [page_module, page_key, initial_model]},
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
