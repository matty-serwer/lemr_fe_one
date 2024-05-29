import React from 'react';
import { Box, Text, Heading } from '@chakra-ui/react';
import { Note, NoteContent } from '@/app/typescript/Interfaces';
import { format } from 'date-fns';

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  return (
    <Box
      bg="whiteAlpha.800"
      boxShadow="lg"
      p={4}
      mb={4}
      border="2px solid"
      borderColor="secondary"
      borderRadius="var(--border-radius)"
    >
      <Box
        borderBottom="2px solid"
        borderBottomColor="secondary"
        pb={2}
        mb={2}
      >
        <Text fontSize="1rem" fontWeight="700" color="secondary">
          Clinician: {note.author === '' ? 'Designation Not Provided' : note.author}
        </Text>
        <Text fontSize="0.8rem" fontWeight="500" color="secondary">
          Date: {format(note.createdAt, 'MMMM dd, yyyy hh:mm a')}
        </Text>
      </Box>
      <Box>
        {note.content.map((content: NoteContent, index: number) => (
          <Text key={index} fontSize="1.2rem" fontWeight="500" color="primary">
            {content.text}
          </Text>
        ))}
      </Box>
    </Box>
  );
};

export default NoteCard;