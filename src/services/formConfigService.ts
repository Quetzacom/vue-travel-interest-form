// Fetch form config

export const loadFormConfig = async () => {
  // Import the formConfig.json file
  const response = await fetch('/formConfig.json');
  if (!response.ok) {
    throw new Error('Failed to load form configuration');
  }

  const config = await response.json();
  return config;
};