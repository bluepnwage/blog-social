import { TextInput, Chip, Stack, Text, Radio, Button } from "@mantine/core";
import { useStyles } from "./styles";
import { Search } from "tabler-icons-react";
import { Topics, FilterTypes } from "@interfaces/blogs";

interface PropTypes {
  filter: { value: FilterTypes; change: (value: FilterTypes) => void };
  category: { chip: Topics; change: (value: Topics) => void };
  search: { value: string; change: (value: string) => void };
}

export function Filters({ filter, category, search }: PropTypes) {
  const { classes, cx } = useStyles();

  const handleClick = () => {
    filter.change("");
    category.change("");
    search.change("");
  };

  return (
    <>
      <div className={cx(classes.filterContainer)}>
        <Stack>
          <TextInput
            value={search.value}
            onChange={({ currentTarget }) => search.change(currentTarget.value)}
            label="Search blog"
            placeholder="Search blog"
            icon={<Search size={14} />}
          />
          <div>
            <Text size={"sm"} component="span">
              Categories
            </Text>
            <Chip.Group value={category.chip} onChange={category.change}>
              <Chip value="">All</Chip>
              <Chip value={"art"}>Art</Chip>
              <Chip value={"business"}>Business</Chip>
              <Chip value={"education"}>Education</Chip>
              <Chip value={"entertainment"}>Entertainment</Chip>
              <Chip value={"fashion"}>Fashion</Chip>
              <Chip value={"sports"}>Sports</Chip>
              <Chip value={"technology"}>Technology</Chip>
              <Chip value={"other"}>Other</Chip>
            </Chip.Group>
          </div>
          <Radio.Group value={filter.value} onChange={filter.change} orientation="vertical" label="Filter">
            <Radio
              classNames={{ label: classes.pointer, radio: classes.pointer }}
              value="popular"
              label="Most popular"
            />
            <Radio
              value={"least popular"}
              label={"Least Popular"}
              classNames={{ label: classes.pointer, radio: classes.pointer }}
            />
            <Radio classNames={{ label: classes.pointer, radio: classes.pointer }} value="recent" label="Most Recent" />
            <Radio classNames={{ label: classes.pointer, radio: classes.pointer }} value="oldest" label="Oldest" />
          </Radio.Group>
          <Button onClick={handleClick}>Clear filters</Button>
        </Stack>
      </div>
    </>
  );
}
