export interface WP_Post {
  id: number;
  title: { rendered: string };
  slug: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

/**
 * Busca posts recentes do WordPress com opção de filtro por Tag
 * @param tagId - ID numérico da tag (ex: 29 para Lift & Learn)
 * @param limit - Quantidade de posts a retornar
 */
export async function getRecentPosts(tagId?: number, limit = 6): Promise<WP_Post[]> {
  // 1. Iniciamos a URL com os parâmetros básicos
  let url = `https://cuattro.live/wp-json/wp/v2/posts?_embed&per_page=${limit}`;
  
  // 2. Se um tagId for fornecido, adicionamos o filtro de tags na query string
  if (tagId) {
    url += `&tags=${tagId}`;
  }
  
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } } as any);
    
    if (!res.ok) throw new Error('Falha ao buscar posts');
    
    return res.json();
  } catch (error) {
    console.error("Erro ao buscar posts no WordPress:", error);
    return [];
  }
}