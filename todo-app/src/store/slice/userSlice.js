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
			logout: build.mutation({
				query: () => ({
					url: "/logout",
					method: "GET",
					credentials: "include", // Assure-toi d'avoir cette ligne ici
				}),
			}),
			modifPastrie: build.mutation({
				query: ({ id, ...data }) => ({
					url: `/api/pastrie/${id}`, // ✅ Utilisation correcte de l'ID
					method: "PUT",
					body: data, // ✅ Envoie des autres données dans le corps de la requête
					headers: {
						"Content-Type": "application/json", // ✅ Spécifier le format JSON
					},
					credentials: "include", // Assure-toi d'avoir cette ligne ici
				}),
			}),
			deletePastrie: build.mutation({
				query: ({ id }) => ({
					url: `/api/pastrie/${id}`,
					method: "DELETE",
					credentials: "include", // Assure-toi d'avoir cette ligne ici
				}),
			}),
			addPastrie: build.mutation({
				query: (data) => ({
					// ✅ Supprimer la destructuration { data }
					url: "/api/pastrie",
					method: "POST",
					body: data,
					credentials: "include",
				}),
			}),
		};
	},
});

export const {
	useLoginMutation,
	useCheckLoginQuery,
	useModifPastrieMutation,
	useDeletePastrieMutation,
	useAddPastrieMutation,
	useLogoutMutation,
} = userSlice;
