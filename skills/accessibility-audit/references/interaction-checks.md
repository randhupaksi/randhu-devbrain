# Interaction Checks

Select checks that match the affected flow. An audit should name the tested state and evidence rather than mark every possible category as passed.

## Keyboard and focus

- Reach each relevant control in a meaningful order; confirm keyboard activation and a visible focus indicator.
- For dialogs, drawers, menus, and disclosures, check entry, close or escape behavior, and focus restoration. Avoid trapping focus outside an intentional modal.
- Verify that sticky headers, overlays, and scroll behavior do not hide the focused control.

## Meaning and feedback

- Check landmarks, heading order, control names, labels, instructions, and link purpose against the visible task.
- For forms, associate field errors with their fields and make the next action clear. For dynamic updates, verify that status feedback is available without relying on color alone.
- Check loading, empty, error, disabled, success, and permission-limited states when they affect the task.

## Presentation and adaptation

- Inspect text and control contrast within the project's visual identity. Check zoom, text enlargement, reflow, and touch targets where the target devices make them relevant.
- Respect reduced motion for nonessential animation. Check that media controls and alternatives match the content's purpose.
- Use available automated scans to find issues, then verify the actual interaction manually. Do not claim full accessibility or a standard level from a single scan.
