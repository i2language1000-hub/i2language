const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

function getAuthHeaders() {
  const token = typeof window !== "undefined"
    ? localStorage.getItem("admin_token")
    : null;

  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// ✅ Enquiry (public)
export async function submitEnquiry(data) {
  const response = await fetch(`${API_URL}/api/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to submit enquiry');
  }

  return response.json();
}

// ✅ GET (can stay public OR protected)
export async function getContentItems(type) {
  const response = await fetch(`${API_URL}/api/${type}`, {
    headers: getAuthHeaders(), // 🔥 FIXED
  });

  if (!response.ok) {
    throw new Error('Failed to fetch content');
  }

  return response.json();
}

// ✅ CREATE
export async function createContentItem(type, data) {
  const response = await fetch(`${API_URL}/api/${type}`, {
    method: 'POST',
    headers: getAuthHeaders(), // 🔥 FIXED
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create content');
  }

  return response.json();
}

// ✅ UPDATE
export async function updateContentItem(type, id, data) {
  const response = await fetch(`${API_URL}/api/${type}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update content');
  }

  return response.json();
}

// ✅ DELETE
export async function deleteContentItem(type, id) {
  const response = await fetch(`${API_URL}/api/${type}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(), // 🔥 IMPORTANT
  });

  if (!response.ok) {
    throw new Error('Failed to delete content');
  }

  return response.json();
}