export interface Magazine {
  name: string,
  id: number,
  published: string,
  url: string,
  thumbnailurl: string,
  embedurl: string
}

export async function getAllMagazines() {
  let response : any = await fetch(`${process.env.REACT_APP_API_URL}/magazines`);
  response = await response.json();
  response = response.data;

  return response;
}

export async function getNewestMagazineID() {
  let response : any = await fetch(`${process.env.REACT_APP_API_URL}/magazines/newest`);
  response = await response.json();
  response = response.data;

  const id = response.id;

  return id;
}

export function getMagazineByID(id: number, allMagazines : Magazine[]) : Magazine {
  return (allMagazines.filter((magazine) => (id === magazine.id))[0]);
}

export function setMagazineThumbnailURL(thumbnail_url : string) : string {
  const base_url = "https://drive.google.com/thumbnail?id=";

  function getThumbnailImageID() : string {
    const BEFORE_ID_TEXT = "/d/";
    const AFTER_ID_TEXT = "/view";

    const imageID = thumbnail_url.substring(
      thumbnail_url.indexOf(BEFORE_ID_TEXT) + BEFORE_ID_TEXT.length, 
      thumbnail_url.lastIndexOf(AFTER_ID_TEXT)
    );

    return (imageID);
  }

  return (`${base_url}`+`${getThumbnailImageID()}`);
};


