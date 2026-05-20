import { useGetQuranProgressHatamHook } from "@/api/coreService";

export function useProgressHatam() {
	const {
		data: dataProgress,
		isSuccess: isSuccessProgress,
		isLoading: isLoadingProgress,
		error: errorProgress,
	} = useGetQuranProgressHatamHook();

	return {
		dataProgress,
		isSuccessProgress,
		isLoadingProgress,
		errorProgress,
	};
}
