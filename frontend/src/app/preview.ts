import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({ name: 'preview' })
export class PreviewPipe implements PipeTransform {
    transform(value: string, maxLen = 150): string {
        if (value.length < maxLen) return value

        var substr = value.substring(0, maxLen)
        var substr = substr.charAt(substr.length - 1) == " " ? substr.substring(0, substr.length - 1) : substr
        return `${substr}...`
    }
}