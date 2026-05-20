import { useGetQuranLastReadsHook } from "@/api/coreService";

export function useLastRead() {
	const {
		data: dataLastRead,
		isSuccess: isSuccessLastRead,
		isLoading: isLoadingLastRead,
		error: errorLastRead,
	} = useGetQuranLastReadsHook();

	return {
		dataLastRead,
		isSuccessLastRead,
		isLoadingLastRead,
		errorLastRead,
	};
}
