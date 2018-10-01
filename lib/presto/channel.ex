defmodule Presto.Channel do

  # # Plug.Conn callbacks
  # @callback init(Plug.opts()) :: Plug.opts()
  # @callback call(Plug.Conn.t(), Plug.opts()) :: Plug.Conn.t()

  # # Component addressing
  # @callback component_id(assigns) :: term()
  # @callback key_spec(Presto.component_key()) :: term()

  # # State, update, and render
  # @callback initial_model(model()) :: term()
  # @callback update(message(), model()) :: model()
  # @callback render(model()) :: Util.safe()

  defmacro __using__(_opts) do
    quote location: :keep do
      @behaviour Presto.Channel

      def join("presto:lobby", payload, socket) do
        # %{visitor_id: visitor_id} = socket.assigns

        if authorized?(payload) do
          {:ok, socket}
        else
          {:error, %{reason: "unauthorized"}}
        end
      end

      def handle_in("presto", payload, socket) do
        # %{visitor_id: visitor_id} = socket.assigns

        # send event to presto page
        {:ok, dispatch} = Presto.dispatch(payload)

        case dispatch do
          [] -> nil
          _ -> push(socket, "presto", dispatch)
        end

        {:reply, {:ok, payload}, socket}
      end

      # Add authorization logic here as required.
      defp authorized?(_payload) do
        true
      end

      # defoverridable Presto.Channel
    end
  end
end
