import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 将文本转换为URL友好的slug
 * @param text 要转换的文本
 * @returns 生成的slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // 替换中文字符为拼音或移除
    .replace(/[\u4e00-\u9fff]/g, '') // 移除中文字符
    // 替换空格和特殊字符为连字符
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}