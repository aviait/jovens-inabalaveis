'use client';

interface Props {
  userId: string;
  userName: string;
  onDone: () => void;
}

export default function DeleteUserButton({ userId, userName, onDone }: Props) {
  async function handleDelete() {
    if (!confirm(`Remover o usuário "${userName}"? Esta ação não pode ser desfeita.`)) return;

    const res = await fetch(`/api/admin/users/${userId}`, { method: 'DELETE' });
    if (res.ok) {
      onDone();
    } else {
      const data = await res.json().catch(() => ({}));
      alert((data as { message?: string }).message ?? 'Erro ao remover usuário.');
    }
  }

  return (
    <button
      onClick={handleDelete}
      style={{
        background: 'transparent',
        color: '#dc2626',
        border: '1px solid #fca5a5',
        borderRadius: 5,
        padding: '4px 10px',
        cursor: 'pointer',
        fontSize: 12,
        fontWeight: 500,
      }}
    >
      Remover
    </button>
  );
}
