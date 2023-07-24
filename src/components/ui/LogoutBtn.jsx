
import IconButton from "./IconButton";
import { COLORS } from "../../common/constants";

export default function LogoutBtn({onPress}) {
  return <IconButton
							icon="log-out"
							color={COLORS.inactive}
							size={24}
							onPress={onPress}
						/>
}
