import { Box, Typography } from '@mui/material';
import { Toolbar, ToolbarClasses, SaveButton, DeleteWithConfirmButton } from 'react-admin';

export const SectionTitle = ({ label }: { label: string }) => {
    return (
        <Typography variant="h6" gutterBottom>
            {label as string}
        </Typography>
    );
};

export const Separator = () => <Box pt="1em" />;

export const FormEditToolbar = (props: any) => (
    <Toolbar {...props}>
      <div className={ToolbarClasses.defaultToolbar}>
        <SaveButton />
        <DeleteWithConfirmButton />
      </div>
    </Toolbar>
  );

export const TransformarAMayusculas = (value: string) => {
  return value?.toUpperCase();
}
