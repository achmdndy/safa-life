import { useGetQuranJuzWithProgressHook } from "@/api/coreService";

export function useJuzList() {
	const {
		data: dataJuzList,
		isSuccess: isSuccessJuzList,
		isLoading: isLoadingJuzList,
		error: errorJuzList,
	} = useGetQuranJuzWithProgressHook();

	return {
		dataJuzList,
		isSuccessJuzList,
		isLoadingJuzList,
		errorJuzList,
	};
}
