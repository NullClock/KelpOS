org 0x7C00
bits 16

start:
    jmp main

; fn puts: prints a string to the screen
; params:
; ds-si: points to string
puts:
    ; save registers we'll modify
    push si
    push ax

.loop:
    lodsb         ; loads next char in  al
    or al, al     ; is next char in al null?
    jz .done

.done:
    pop ax
    pop si
    ret
    mov ah, 0Eh
    mov al, 113
    

main:
    mov ax, 0
    mov dx, ax
    mov es, ax

    ; setup stack

    mov ss, ax
    mov sp, 0x7C00

    hlt

.halt:
    jmp .halt

times 510-($-$$) db 0
dw 0AA55h
