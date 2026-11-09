"use client";

import { useCallback, useEffect, useState } from "react";

type Client = {
  id: number;
  name: string;
  email: string;
};

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [clients, setClients] = useState<Client[]>([]);
  const [fetchStatus, setFetchStatus] = useState<Status>("idle");

  const fetchClients = useCallback(async () => {
    setFetchStatus("loading");
    try {
      const response = await fetch("http://localhost:8080/clients");
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Request failed: ${response.status}`);
      }
      const data: Client[] = await response.json();
      setClients(data);
      setFetchStatus("success");
    } catch (err) {
      setFetchStatus("error");
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

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
        const text = await response.text();
        throw new Error(text || `Request failed: ${response.status}`);
      }

      setStatus("success");
      setName("");
      setEmail("");
      await fetchClients();
    } catch (err) {
      setStatus("error");
      console.error(err);
    }
  }

  return (
    <main className="grid h-full min-h-full grid-cols-1 lg:grid-cols-2 gap-6 p-6">
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

      <section className="w-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold leading-tight text-zinc-900">
            Список клиентов
          </h1>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
            {clients.length} записей
          </span>
        </div>

        {fetchStatus === "loading" && (
          <p className="mt-6 text-sm text-zinc-500">Загрузка...</p>
        )}

        {fetchStatus === "error" && (
          <p className="mt-6 rounded-xl bg-red-50 p-3 text-sm text-red-700">
            Не удалось загрузить клиентов. Проверьте бэкенд на <code className="font-mono">http://localhost:8080</code>.
          </p>
        )}

        {fetchStatus === "success" && clients.length === 0 && (
          <p className="mt-6 text-sm text-zinc-500">
            В базе пока нет клиентов.
          </p>
        )}

        {fetchStatus === "success" && clients.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  <th className="px-3 py-3">ID</th>
                  <th className="px-3 py-3">Имя</th>
                  <th className="px-3 py-3">Email</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr
                    key={client.id}
                    className="border-b border-zinc-100 transition hover:bg-zinc-50"
                  >
                    <td className="px-3 py-3 font-mono text-xs text-zinc-500">
                      {client.id}
                    </td>
                    <td className="px-3 py-3 text-zinc-900">{client.name}</td>
                    <td className="px-3 py-3 text-zinc-700">{client.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
