"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("http://localhost:8080/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        let detail = "";
        try {
          const text = await response.text();
          if (text) detail = text;
        } catch {
          // ignore
        }
        throw new Error(detail || `Request failed: ${response.status}`);
      }

      setStatus("success");
      setName("");
      setEmail("");
    } catch (err) {
      setStatus("error");
      console.error(err);
    }
  }

  return (
    <main className="flex flex-1 w-full max-w-md flex-col items-center justify-center gap-6 bg-zinc-50 px-6 py-12">
      <section className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold leading-tight text-zinc-900">
          Введите имя и email
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Данные отправятся на сервер по адресу <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs">/clients</code>.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-700"
            >
              Имя
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Введите имя"
              className="block w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Введите email"
              className="block w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              required
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Отправка..." : "Отправить"}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-700">
            Данные успешно отправлены.
          </p>
        )}

        {status === "error" && (
          <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
            Ошибка при отправке. Проверьте, что бэкенд запущен на <code className="font-mono">http://localhost:8080</code>.
          </p>
        )}
      </section>
    </main>
  );
}

