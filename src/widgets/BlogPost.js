import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import BrandCardHeader from '@mui-treasury/components/cardHeader/brand';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN03TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n03';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 900,
        borderRadius: 20,
    },
    content: {
        padding: 24,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin:2
    },
}));

export const BlogPost = React.memo(function ProjectCard(props) {
    const styles = useN03TextInfoContentStyles();
    const shadowStyles = useLightTopShadowStyles();
    const cardStyles = useStyles();
    let post = props.post;
    return (
        <Card className={cx(cardStyles.root, shadowStyles.root)}>
            <BrandCardHeader
                image={post.image}
                extra={new Date(post.created_at).toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                })}
            />
            <CardContent className={cardStyles.content}>
                <TextInfoContent
                    classes={styles}
                    overline={'Written by ' + post.username}
                    heading={post.title}
                    body={post.body}
                />
                <div className={cardStyles.chips}>
                {post.tags.map((tag) => (
                    <Button href={'/tags/' + tag}>
                        <Chip icon={<LocalOfferIcon/>} key={tag} label={tag}
                              className={cardStyles.chip} />
                    </Button>
                ))}
                </div>
            </CardContent>
        </Card>
    );
});

export default BlogPost;
