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

package.json
```
  ...
  "dependencies": {
    "presto": "file:../deps/presto",
  },
  ...
```

brunch-config.js
```
  // Configure your plugins
  plugins: {
    babel: {
      // Do not use ES6 compiler in vendor code
      ignore: [/vendor/]
    },
    replacement: {
      replacements: [{
        files: [/\.js$/],
  match: {find: /(?!_)\b(require)(?!_|d)/gm, replace: 'MY_REQUIRE'}
      }]
    },
    sass: {
      options: {
        includePaths: ["node_modules"]
      }
    }
  },

  modules: {
    autoRequire: {
      "js/app.js": ["js/app"]
    }
  },

  npm: {
    enabled: true,
    globals: {
      $: "jquery",
      jQuery: "jquery",
      uikit: "uikit",
      icons: "uikit/dist/js/uikit-icons",
    },
    styles: {
      unpoly: ["dist/unpoly.css"],
    }
  }
```


## Installation

If [available in Hex](https://hex.pm/docs/publish), the package can be installed
by adding `presto` to your list of dependencies in `mix.exs`:

```elixir
def deps do
  [
    {:presto, "~> 0.1.2"}
  ]
end
```

Documentation can be generated with [ExDoc](https://github.com/elixir-lang/ex_doc)
and published on [HexDocs](https://hexdocs.pm). Once published, the docs can
be found at [https://hexdocs.pm/presto](https://hexdocs.pm/presto).


