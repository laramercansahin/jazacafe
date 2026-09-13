export default function Home() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        textAlign: "center",
        padding: 24,
      }}
    >
      <h1
        style={{
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          fontSize: 40,
          color: "#E8B084",
          margin: 0,
        }}
      >
        Jaza — Admin
      </h1>
      <p style={{ color: "var(--taupe)", fontSize: 13, margin: 0 }}>
        Rezervasyon, doluluk ve içerik yönetimi ekranları MVP adım 5&apos;te bu panele eklenecek.
      </p>
    </main>
  );
}
