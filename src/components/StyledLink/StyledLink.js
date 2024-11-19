import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledLink = styled(Link)(({ theme }) => ({
	color: "inherit",
	textDecoration: "none",
	"&:hover": {
		color: theme.palette.primary.main,
	},
	"&:active, &:focus": {
		color: "inherit",
	},
}));

export default StyledLink;
