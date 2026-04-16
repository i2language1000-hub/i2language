const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export async function submitEnquiry(data) {
  const response = await fetch(`${API_URL}/api/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to submit enquiry');
  }
  return response.json();
}

export async function getContentItems(type) {
  const response = await fetch(`${API_URL}/api/content?type=${type}`);
  if (!response.ok) {
    throw new Error('Failed to fetch content');
  }
  const data = await response.json();
  return data.data || [];
}

export async function createContentItem(type, data, token) {
  const response = await fetch(`${API_URL}/api/content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ type, ...data })
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to create content');
  }
  return response.json();
}

export async function deleteContentItem(id, token) {
  const response = await fetch(`${API_URL}/api/content/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to delete content');
  }
  return response.json();
}
