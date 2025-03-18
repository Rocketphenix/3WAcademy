import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userSlice = createApi({
	reducerPath: "user",
	tagTypes: ["Users"],
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3001/", // Point de base pour les requêtes
	}),
	endpoints: (build) => {
		return {
			// Requête pour obtenir toutes les pâtisseries
			login: build.mutation({
				query: (data) => ({
					url: "/login",
					method: "POST",
					body: data,
					credentials: "include",
				}),
			}),
			checkLogin: build.query({
				query: () => ({
					url: "/me",
					method: "GET",
					credentials: "include", // Assure-toi d'avoir cette ligne ici
				}),
			}),
			modifPastries: build.mutation({
				query: ({ id, ...data }) => ({
					url: `/pastrie/${id}`, // ✅ Utilisation correcte de l'ID
					method: "PUT",
					body: data, // ✅ Envoie des autres données dans le corps de la requête
					headers: {
						"Content-Type": "application/json", // ✅ Spécifier le format JSON
					},
				}),
			}),
		};
	},
});

export const { useLoginMutation, useCheckLoginQuery } = userSlice;
