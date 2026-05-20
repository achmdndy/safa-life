import { useGetQuranBookmarksAyahsHook } from "@/api/coreService";

export function useBookmarkList() {
	const {
		data: dataBookmark,
		isSuccess: isSuccessBookmark,
		isLoading: isLoadingBookmark,
		error: errorBookmark,
	} = useGetQuranBookmarksAyahsHook();

	return {
		dataBookmark,
		isSuccessBookmark,
		isLoadingBookmark,
		errorBookmark,
	};
}
