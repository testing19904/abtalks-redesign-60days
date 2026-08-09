export interface ProofValidationResult {
  isValid: boolean;
  githubError?: string;
  linkedinError?: string;
}

export function validateGithubUrl(url: string): { isValid: boolean; error?: string } {
  const trimmed = url.trim();
  if (!trimmed) {
    return { isValid: false, error: "GitHub URL is required." };
  }
  
  if (!trimmed.startsWith("https://")) {
    return { isValid: false, error: "URL must start with https://" };
  }

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.toLowerCase();
    if (host !== "github.com" && host !== "www.github.com") {
      return { isValid: false, error: "Enter a valid GitHub repository or commit URL." };
    }
    if (parsed.pathname.length <= 1) {
      return { isValid: false, error: "Include your repository or commit path." };
    }
    return { isValid: true };
  } catch {
    return { isValid: false, error: "Enter a valid GitHub repository or commit URL." };
  }
}

export function validateLinkedinUrl(url: string): { isValid: boolean; error?: string } {
  const trimmed = url.trim();
  if (!trimmed) {
    return { isValid: false, error: "LinkedIn URL is required." };
  }

  if (!trimmed.startsWith("https://")) {
    return { isValid: false, error: "URL must start with https://" };
  }

  try {
    const parsed = new URL(trimmed);
    const host = parsed.hostname.toLowerCase();
    if (host !== "linkedin.com" && host !== "www.linkedin.com") {
      return { isValid: false, error: "Enter a valid LinkedIn post URL." };
    }
    if (parsed.pathname.length <= 1) {
      return { isValid: false, error: "Include your LinkedIn post URL path." };
    }
    return { isValid: true };
  } catch {
    return { isValid: false, error: "Enter a valid LinkedIn post URL." };
  }
}

export function validateProofUrls(githubUrl: string, linkedinUrl: string): ProofValidationResult {
  const ghResult = validateGithubUrl(githubUrl);
  const liResult = validateLinkedinUrl(linkedinUrl);

  return {
    isValid: ghResult.isValid && liResult.isValid,
    githubError: ghResult.error,
    linkedinError: liResult.error,
  };
}
