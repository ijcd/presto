# Presto

Presto is an Elixir library for creating Elm-like or React-like single page applications (SPAs) **completely in Elixir**.

It was presented at ElixirConfEU 2018. You can find the [slides here](https://www.slideshare.net/ijcd/elixirconfeu-2018-spas-without-the-spa).

## Installation

Add this to `mix.exs`:

```
{:presto, "~> 0.1.2"}
```

## Philosophy

Web development is too complciated. Front-ends, back-ends, multiple languages, markup, it's all too complicated. Things can be simpler.

We want:

1. the feel and data model (mostly) of React.
2. views to be a projection of the data.
3. the simplicity of Elm's model/update/view functions.
4. all of this in Elixir.

`Model` -> `Update` -> `View`<br>
`State` -> `Message` -> `Response`

This is a `GenServer`.

## How It Works

1. A `GenServer` keeps the state for the user. It’s all on the server.
2. For a single component root, there is one `GenServer` that comes to life when it gets a message.
3. It receives DOM events from the browser over a `channel`, updating the `GenServer` state.
4. UI updates are returned via the `channel`.

The `GenServers` are managed by a `DynamicSupervisor`.

Components are coped to a `visitor_id`, which is unique to each browser.

### Add Presto to `mix.exs`

mix.exs
```elixir
  defp deps do
    [
      ...
      {:presto, "~> 0.1.2"},
      ...
    ]
  end
```

### Create a component

lib/presto/single_counter.ex
```elixir
defmodule PrestoDemoWeb.Presto.SingleCounter do
  use Presto.Component
  use Taggart.HTML
  require Logger

  @impl Presto.Component
  def initial_model(_model) do
    0
  end

  @impl Presto.Component
  def update(message, model) do
    case message do
      %{"event" => "click", "id" => "inc"} ->
        model + 1

      %{"event" => "click", "id" => "dec"} ->
        model - 1
    end
  end

  @impl Presto.Component
  def render(model) do
    div do
      "Counter is: #{inspect(model)}"

      button(id: "inc", class: "presto-click") do
        "More"
      end

      button(id: "dec", class: "presto-click") do
        "Less"
      end
    end
  end
end
```

### Add the component to a view

index.html.eex
```elixir
<%= Presto.render(Presto.component(PrestoDemoWeb.Presto.SingleCounter, assigns[:visitor_id])) %>
```

### Wire up the javascript

assets/package.json
```javascript
  ...
  "dependencies": {
    ...
    "presto": "file:../deps/presto"
  },
  ...
```

app.js
```javascript
import {Presto} from "presto"
import unpoly from "unpoly/dist/unpoly.js"
let presto = new Presto(channel, up);
```

### Wire Up A Presto Channel

user_socker.ex
```elixir
defmodule PrestoDemoWeb.UserSocket do
  use Phoenix.Socket

  channel("presto:*", PrestoDemoWeb.CounterChannel)

  def connect(%{"token" => token} = _params, socket) do
    case PrestoDemoWeb.Session.decode_socket_token(token) do
      {:ok, visitor_id} ->
        {:ok, assign(socket, :visitor_id, visitor_id)}

      {:error, _reason} ->
        :error
    end
  end
  ...
```

component_channel.ex
```elixir
defmodule PrestoDemoWeb.CounterChannel do
  ...
  def handle_in("presto", payload, socket) do
    %{visitor_id: visitor_id} = socket.assigns

    # send event to presto component
    {:ok, dispatch} = Presto.dispatch(PrestoDemoWeb.Presto.SingleCounter, visitor_id, payload)

    case dispatch do
      [] -> nil
      _ -> push(socket, "presto", dispatch)
    end

    {:reply, {:ok, payload}, socket}
  end
  ...
end
```

### Setup user_token and visitor_id plugs

router.ex
```elixir
  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
    plug(PrestoDemoWeb.Plugs.VisitorIdPlug)
    plug(PrestoDemoWeb.Plugs.UserTokenPlug)
  end
```

user_token_plug.ex
```elixir
defmodule PrestoDemoWeb.Plugs.UserTokenPlug do
  import Plug.Conn

  def init(default), do: default

  def call(conn, _default) do
    if visitor_id = conn.assigns[:visitor_id] do
      user_token = PrestoDemoWeb.Session.encode_socket_token(visitor_id)
      assign(conn, :user_token, user_token)
    else
      conn
    end
  end
end
```

visitor_id_plug.ex
```elixir
defmodule PrestoDemoWeb.Plugs.VisitorIdPlug do
  import Plug.Conn

  @key :visitor_id

  def init(default), do: default

  def call(conn, _default) do
    visitor_id = get_session(conn, @key)

    if visitor_id do
      assign(conn, @key, visitor_id)
    else
      visitor_id = Base.encode64(:crypto.strong_rand_bytes(32))

      conn
      |> put_session(@key, visitor_id)
      |> assign(@key, visitor_id)
    end
  end
end
```

## Testing

Testing is easy. It’s just a `GenServer`. Spin them up, update, test the response. Done.

## Growing Your Application

Use the language. Growing your app is very simple with this approach. If your `render()` method gets too big, you just split it up in to helpers and modules and whatnot. If your `update()` method gets too big, you just split it up in to helpers and modules and whatnot. 


## Demos

### Simple Counter

Here is the code for a [simple counter demo](https://github.com/ijcd/presto_demo)

### PrestoChange.io

This is a real application using `Presto`.

The code is [here](https://github.com/ijcd/prestochange).

This is running on the West Coast of the USA:

[www.prestochange.io](https://www.prestochange.io)

This is running in Central Europe:

[eu.prestochange.io](https://eu.prestochange.io)

