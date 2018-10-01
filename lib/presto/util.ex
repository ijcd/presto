defmodule Presto.Util do
  @typedoc "Guaranteed to be safe"
  @type safe :: {:safe, iodata}

  @doc """
  Fails if the result is not safe. In such cases, you can
  invoke `html_escape/1` or `raw/1` accordingly before.
  """
  @spec safe_to_string(safe) :: String.t()
  def safe_to_string({:safe, iodata}) do
    IO.iodata_to_binary(iodata)
  end
end
