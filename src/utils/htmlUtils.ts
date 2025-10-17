// src/utils/htmlUtils.ts

/**
 * Strip HTML tags from a string and return plain text
 */
export const stripHtmlTags = (html: string): string => {
  if (!html) return '';

  // Remove HTML tags
  let text = html.replace(/<[^>]*>/g, '');

  // Decode common HTML entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");

  // Replace multiple spaces with single space
  text = text.replace(/\s+/g, ' ');

  // Trim whitespace
  text = text.trim();

  return text;
};

/**
 * Extract plain text from HTML description for editing
 * Used specifically for form fields where we want to preserve the raw text
 */
export const extractPlainTextForEditing = (html: string): string => {
  if (!html) return '';

  let text = html;

  // Convert common HTML structures to plain text equivalents
  // Convert <br>, <br/>, <br /> to newlines
  text = text.replace(/<br\s*\/?>/gi, '\n');

  // Convert </p> to newlines
  text = text.replace(/<\/p>/gi, '\n');

  // Convert <li> to bullet points with newlines
  text = text.replace(/<li[^>]*>/gi, '\n• ');
  text = text.replace(/<\/li>/gi, '');

  // Remove all other HTML tags
  text = text.replace(/<[^>]*>/g, '');

  // Decode HTML entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");

  // Clean up whitespace
  text = text.replace(/[ \t]+/g, ' '); // Multiple spaces to single
  text = text.replace(/\n\s+/g, '\n'); // Remove spaces at start of lines
  text = text.replace(/\n{3,}/g, '\n\n'); // Max 2 consecutive newlines

  // Trim
  text = text.trim();

  return text;
};

/**
 * Convert HTML to plain text with proper formatting
 * Preserves line breaks for better readability
 */
export const htmlToPlainText = (html: string): string => {
  if (!html) return '';

  let text = html;

  // Convert <br>, <br/>, <br /> to newlines
  text = text.replace(/<br\s*\/?>/gi, '\n');

  // Convert </p> and </div> to double newlines for paragraph separation
  text = text.replace(/<\/p>/gi, '\n\n');
  text = text.replace(/<\/div>/gi, '\n\n');

  // Convert <li> to bullet points
  text = text.replace(/<li[^>]*>/gi, '\n• ');
  text = text.replace(/<\/li>/gi, '');

  // Remove all other HTML tags
  text = text.replace(/<[^>]*>/g, '');

  // Decode HTML entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");

  // Clean up extra whitespace
  text = text.replace(/[ \t]+/g, ' '); // Multiple spaces to single space
  text = text.replace(/\n\s+/g, '\n'); // Remove spaces at start of lines
  text = text.replace(/\n{3,}/g, '\n\n'); // Maximum 2 consecutive newlines

  // Trim whitespace
  text = text.trim();

  return text;
};

/**
 * Check if a string contains HTML tags
 */
export const containsHtml = (text: string): boolean => {
  if (!text) return false;
  const htmlRegex = /<[^>]*>/;
  return htmlRegex.test(text);
};

/**
 * Truncate text to a specific length with ellipsis
 */
export const truncateText = (
  text: string,
  maxLength: number,
  ellipsis: string = '...',
): string => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength - ellipsis.length).trim() + ellipsis;
};
