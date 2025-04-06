import { url } from "./configuration";

export const retrieve = async (token) => {
  const reponse = await fetch(`${url}/faq/retrieve`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await reponse.json();
};

export const insert = async (body, token) => {
  const reponse = await fetch(`${url}/faq/insert`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return await reponse.json();
};


export const update = async (body, token, id) => {
  const reponse = await fetch(`${url}/faq/update/${id}?_method=PATCH`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return await reponse.json();
};

export const destroy = async (token, id) => {
  const reponse = await fetch(`${url}/faq/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await reponse.json();
};