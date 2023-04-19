import {AspectRatio, Card, CardOverflow, Chip, Divider, Typography} from "@mui/joy";


const Movie = ({ movie }) => {

    return(
        <Card variant="outlined" sx={{ width: 320, m:1 }}>
            <CardOverflow>
                <AspectRatio ratio="2">
                    <img
                        src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318"
                        srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                        loading="lazy"
                        alt="Movie Cover"
                    />
                </AspectRatio>
            </CardOverflow>
            <Typography level="h2" sx={{ fontSize: 'md', mt: 2 }}>
                {movie.title}
            </Typography>
            <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
                {movie.year}
            </Typography>
            <Divider />
            <CardOverflow
                variant="soft"
                sx={{
                    display: 'flex',
                    gap: 1.5,
                    py: 1.5,
                    px: 'var(--Card-padding)',
                    bgcolor: 'background.level1',
                }}
            >
                <Typography level="body2" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                    {movie.rating}
                </Typography>
                <Divider orientation="vertical" />
                <Typography level="body3" sx={{ fontWeight: 'md', color: 'text.secondary' }}>
                    {
                        movie.tags.map((tag) => (
                            <Chip variant={"outlined"} size={"sm"} sx={{
                                mx:0.2
                            }}>
                                {tag}
                            </Chip>
                        ))
                    }
                </Typography>
            </CardOverflow>
        </Card>
    )
}

export default Movie;