import magazines from "./Magazines.json";

export interface Magazine {
  name: string,
  id: number,
  published: string,
  url: string,
  thumbnail: string,
  embedurl: string
}

export const allMagazines : Magazine[] = magazines;

export function getNewestMagazineID() : number {
  function compareDates(a: Magazine, b: Magazine) : number {
    const dateA = new Date(a.published);
    const dateB = new Date(b.published);
    
    if (dateA > dateB) {
      return -1;
    } else if (dateA < dateB) {
      return 1
    }

    return 0;
  }

  const sortedMagazines = [...allMagazines].sort(compareDates);
  return sortedMagazines[0].id;
}

export function getMagazineByID(id: number) : Magazine {
  return (allMagazines.filter((magazine) => (id === magazine.id))[0]);
}

export function setMagazineEmbedLink(id: number) : string {
  return (getMagazineByID(id).embedurl);
}
