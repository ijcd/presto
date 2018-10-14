defmodule Presto.Action do
  @type t :: UpdateComponent.t() | Custom.t()

  defmodule UpdateComponent do
    defstruct name: "update_component",
              component_id: nil,
              content: nil

    @type t :: %__MODULE__{
            name: String.t(),
            component_id: String.t(),
            content: String.t()
          }
  end

  defmodule Custom do
    defstruct name: "custom",
              component_id: nil,
              content: nil

    @type t :: %__MODULE__{
            name: String.t(),
            component_id: String.t(),
            content: String.t()
          }
  end
end
