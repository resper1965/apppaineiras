import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const transformNotionPage = (page: PageObjectResponse) => {
  return {
    id: page.id,
    title: page.properties.Name?.title[0]?.plain_text || "Sem título",
  };
};

interface SimplifiedPage {
  id: string;
  createdTime: string;
  lastEditedTime: string;
  createdBy: string;
  lastEditedBy: string;
  title: string;
  description: string;
  link: string;
  imageUrl?: string;
  periodStart?: string;
  periodEnd?: string;
}

export function simplifyNotionBanners(pages: any[]): SimplifiedPage[] {
  return pages.map(page => {
      const properties = page.properties;

      return {
          id: page.id,
          createdTime: page.created_time,
          lastEditedTime: page.last_edited_time,
          createdBy: page.created_by.id,
          lastEditedBy: page.last_edited_by.id,
          title: properties.Nome.title[0]?.plain_text || '',
          description: properties.Descrição.rich_text[0]?.plain_text || '',
          link: properties.Link.url || '',
          imageUrl: properties.Imagem.files[0]?.file?.url || undefined,
          periodStart: properties['Período']?.date?.start || undefined,
          periodEnd: properties['Período']?.date?.end || undefined,
      };
  });
}