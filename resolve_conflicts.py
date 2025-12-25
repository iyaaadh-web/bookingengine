import os
import re

def resolve_conflicts(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                if '<<<<<<< HEAD' in content:
                    print(f"Resolving conflicts in {filepath}")
                    # Regex to find the conflict block and keep HEAD content
                    # Pattern: <<<<<<< HEAD\n(content)\n=======\n(remote content)\n>>>>>>> (hash)
                    # We want to keep (content)
                    
                    # Note: This simple regex assumes standard conflict markers and might need adjustment if nested or complex
                    # Using dotall to match newlines
                    new_content = re.sub(
                        r'<<<<<<< HEAD\n(.*?)\n=======\n.*?\n>>>>>>> [a-f0-9]+', 
                        r'\1', 
                        content, 
                        flags=re.DOTALL
                    )
                    
                    # Handle case where it might be the last line without newline or slightly different formatting
                    # But the above should catch most standard git merge conflicts
                    
                    if new_content != content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Resolved {filepath}")
                    else:
                        print(f"Could not resolve {filepath} with regex")
            except Exception as e:
                print(f"Error processing {filepath}: {e}")

if __name__ == "__main__":
    resolve_conflicts("c:/Users/DELL/.gemini/antigravity/scratch/fasmala-travels/src")
