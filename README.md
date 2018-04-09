# Presto

Router:
```
  plug(PrestoDemoWeb.Plugs.VisitorIdPlug)
  plug(PrestoDemoWeb.Plugs.UserTokenPlug)
```

Router:
```
  forward("/", Presto.Root)
```

## Installation

If [available in Hex](https://hex.pm/docs/publish), the package can be installed
by adding `presto` to your list of dependencies in `mix.exs`:

```elixir
def deps do
  [
    {:presto, "~> 0.1.0"}
  ]
end
```

Documentation can be generated with [ExDoc](https://github.com/elixir-lang/ex_doc)
and published on [HexDocs](https://hexdocs.pm). Once published, the docs can
be found at [https://hexdocs.pm/presto](https://hexdocs.pm/presto).


