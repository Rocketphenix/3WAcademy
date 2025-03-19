import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "pastrie",
	tagTypes: ["Pastries"],
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3001/game/", // Point de base pour les requêtes
	}),
	endpoints: (build) => {
		return {
			// Requête pour obtenir toutes les pâtisseries
			getPastries: build.query({
				query: () => "/pastries",
				providesTags: ["Pastries"], // Pour invalider l'état des pâtisseries après une mise à jour
			}),
			// Mutation pour mettre à jour les pâtisseries
			updatePastries: build.mutation({
				query: (quantityWon) => ({
					url: `/win-pastries/${quantityWon}`, // Remplacez cette URL par celle appropriée de votre API
					method: "GET",
				}),
			}),
		};
	},
});

export const { useGetPastriesQuery, useUpdatePastriesMutation } = apiSlice;
